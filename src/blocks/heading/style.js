const style = (attributes) => {
    const WRAPPER = attributes?.blockClass;
    console.log('WRAPPER', WRAPPER);
    
    return(`
        .${WRAPPER}{
            --heading-text-align: ${attributes?.alignment};
            --heading-text-color: ${attributes?.textColor};
            --heading-font-family: ${attributes?.typography?.fontFamily};
            --heading-font-size: ${attributes?.typography?.fontSize}px;
        }
    `);
}

export default style;