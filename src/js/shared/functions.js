 class Functions {
   static calculateHeight() {
        const windowHeight = window.innerHeight;
        const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
        const footerHeight = document.querySelector('footer') ? document.querySelector('footer').offsetHeight : 0;
        document.querySelector('#content').removeAttribute('style');
        const content = document.querySelector('#content').offsetHeight;
        const contentHeight = windowHeight - headerHeight - footerHeight;
        if (content < contentHeight) {
            document.querySelector('#content').style.height = contentHeight + 'px';
        }
    }
    static resetStyles() {
        document.querySelector('.header-menu--create').classList.remove('no-display');
    }
    static resize() {
        this.calculateHeight();
    }
    static render(template, node) {
        this.resetStyles();
       if(!node) { return; }
       const data = (typeof template === 'function' ? template() : template);
       if(data) {
        node.innerHTML = data;   
       }
       this.calculateHeight();
   }
}
