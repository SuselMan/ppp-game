import Level1 from './levels/level1';
import Level2 from './levels/level2';

window.initApp = (scene, lib) => {
    startApp.bind(scene)(lib);
}

const prepareScaling = () => {
    console.info('screen resize');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const canvas = document.getElementById('canvas');
            const animationContainer = document.getElementById('animation_container');
            const dom_overlay_container = document.getElementById('dom_overlay_container');
            canvas.style.height = '100%';
            animationContainer.style.height = '100%';
            const screenH = window.innerHeight;
            const width = screenH * 0.5625;
            canvas.style.width = `${width}px`;
            animationContainer.style.width = `${width}px`;
            dom_overlay_container.style.width = `${width}px`;
            dom_overlay_container.style.height = '100%';
            const marginLeft = (window.innerWidth - width) / 2;
            // canvas.style.marginLeft = `${marginLeft}px`;
            animationContainer.style.marginLeft = `${marginLeft}px`;
            // dom_overlay_container.style.marginLeft = `${marginLeft}px`;
            resolve();
        }, 100);
    });
}

async function startApp(lib) {
    createjs.Touch.enable(this.stage);
    await prepareScaling();
    window.addEventListener('resize', prepareScaling);
    const currentScene = new Level1({ stage: this, lib, name: 'Level1' });
    currentScene.start();
}

