/**
 * ==========================================================================
 * PRESENTER SYNC ENGINE (PresenterSyncEngine)
 * Zero-latency bidirectional BroadcastChannel & LocalStorage synchronization hub
 * Synchronizes slide index, drawing ink, laser pointers, timers, themes, loupe & popovers
 * ==========================================================================
 */

class PresenterSyncEngine {
    constructor() {
        this.lessonKey = this.getLessonKey();
        this.channelName = 'ielts_sync_' + this.lessonKey;
        this.instanceId = 'deck_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        this.listeners = new Map();
        this.isConnected = false;
        this.hasRemotePeer = false;
        this.lastPeerHeartbeat = 0;
        this.processedMessageIds = new Set();

        this.initChannel();
    }

    getLessonKey() {
        try {
            const path = window.location.pathname || '';
            const parts = path.replace(/\\/g, '/').split('/').filter(Boolean);
            const lastTwo = parts.slice(-2).join('_');
            return lastTwo.replace(/[^a-zA-Z0-9_-]/g, '_') || 'global_deck';
        } catch (e) {
            return 'global_deck';
        }
    }

    initChannel() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleIncomingMessage(event.data);
                this.isConnected = true;
            } catch (err) {
                console.warn('BroadcastChannel failed, falling back to localStorage sync', err);
                this.initStorageFallback();
            }
        } else {
            this.initStorageFallback();
        }

        // Periodic heartbeat & peer discovery
        setInterval(() => {
            const isPresenter = window.presenterViewUI ? window.presenterViewUI.isPresenter : false;
            this.emit('HEARTBEAT', { senderId: this.instanceId, isPresenter, lessonKey: this.lessonKey });

            // Check peer liveness (no message in 8s = waiting)
            if (this.lastPeerHeartbeat > 0 && Date.now() - this.lastPeerHeartbeat > 8000) {
                this.hasRemotePeer = false;
                this.notifyStatusChange(false);
            }
        }, 2500);
    }

    initStorageFallback() {
        window.addEventListener('storage', (e) => {
            if (e.key === this.channelName && e.newValue) {
                try {
                    const data = JSON.parse(e.newValue);
                    this.handleIncomingMessage(data);
                } catch (err) {
                    console.error('Failed to parse storage sync message', err);
                }
            }
        });
        this.isConnected = true;
    }

    emit(type, payload = {}) {
        const message = {
            type,
            payload,
            senderId: this.instanceId,
            lessonKey: this.lessonKey,
            timestamp: Date.now(),
            nonce: Math.random()
        };

        if (this.channel) {
            try {
                this.channel.postMessage(message);
            } catch (err) {
                console.warn('Channel postMessage failed', err);
            }
        }

        // Write to localStorage only when a remote peer is active (reduces unnecessary I/O)
        if (this.hasRemotePeer || !this.channel) {
            try {
                localStorage.setItem(this.channelName, JSON.stringify(message));
            } catch (e) {}
        }
    }

    send(type, payload = {}) {
        this.emit(type, payload);
    }

    handleIncomingMessage(message) {
        if (!message || message.senderId === this.instanceId) return;
        if (message.lessonKey && message.lessonKey !== this.lessonKey) return;

        // Deduplicate messages across BroadcastChannel and Storage events
        const msgId = `${message.senderId}_${message.timestamp}_${message.type}_${message.nonce || 0}`;
        if (this.processedMessageIds.has(msgId)) return;
        this.processedMessageIds.add(msgId);
        if (this.processedMessageIds.size > 200) {
            const iter = this.processedMessageIds.values();
            for (let i = 0; i < 50; i++) {
                this.processedMessageIds.delete(iter.next().value);
            }
        }

        this.hasRemotePeer = true;
        this.lastPeerHeartbeat = Date.now();
        this.notifyStatusChange(true);

        const handlers = this.listeners.get(message.type) || [];
        handlers.forEach(handler => {
            try {
                handler(message.payload, message);
            } catch (err) {
                console.error(`Error in sync handler for ${message.type}:`, err);
            }
        });

        // Universal wildcard listeners
        const allHandlers = this.listeners.get('*') || [];
        allHandlers.forEach(handler => {
            try {
                handler(message.type, message.payload, message);
            } catch (err) {}
        });
    }

    on(type, handler) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type).push(handler);
    }

    off(type, handler) {
        if (!this.listeners.has(type)) return;
        const list = this.listeners.get(type).filter(h => h !== handler);
        this.listeners.set(type, list);
    }

    notifyStatusChange(connected) {
        const dot = document.getElementById('cpSyncDot');
        if (dot) {
            dot.className = connected ? 'cp-sync-dot connected' : 'cp-sync-dot waiting';
            dot.title = connected ? 'Synchronized with audience presentation window' : 'Waiting for audience presentation window...';
        }
    }
}

// Global instantiation and alias compatibility
window.presenterSyncEngine = new PresenterSyncEngine();
window.presenterViewSync = window.presenterSyncEngine;
