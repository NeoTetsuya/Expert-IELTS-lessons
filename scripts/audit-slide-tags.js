const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const openSections = (content.match(/<section[^>]*class=["'][^"']*slide[^"']*["']/gi) || []).length;
    const closeSections = (content.match(/<\/section>/gi) || []).length;
    const openSlideCards = (content.match(/<slide-card/gi) || []).length;
    const closeSlideCards = (content.match(/<\/slide-card>/gi) || []).length;
    
    console.log(filePath + ':');
    console.log(`  <section class="slide">: ${openSections} vs </section>: ${closeSections}`);
    console.log(`  <slide-card>: ${openSlideCards} vs </slide-card>: ${closeSlideCards}`);
    if (openSections !== closeSections || openSlideCards !== closeSlideCards) {
        console.log(`  ⚠️ MISMATCH DETECTED IN ${filePath}!\n`);
    } else {
        console.log(`  ✅ OK\n`);
    }
}

['expert 5', 'expert 6'].forEach(dir => {
    const fullDir = path.resolve(dir);
    if (fs.existsSync(fullDir)) {
        fs.readdirSync(fullDir).filter(f => f.endsWith('.html')).forEach(f => {
            checkFile(path.join(fullDir, f));
        });
    }
});
