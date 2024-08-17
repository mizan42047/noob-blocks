const style = (attributes) => {
    const WRAPPER = attributes?.blockClass;
    
    return(`
        .${WRAPPER}{
            --heading-text-align-desktop: ${attributes['alignmentDesktop']};
            --heading-text-align-tablet: ${attributes['alignmentTablet']};
            --heading-text-align-mobile: ${attributes['alignmentMobile']};
            --heading-text-color: ${attributes?.textColor};
            --heading-font-family: ${attributes?.typography?.fontFamily};
            --heading-font-size: ${attributes?.typography?.fontSize}px;
        }
    `);
}

export default style;