const style = (attributes) => {
    const WRAPPER = attributes?.blockClass;
    return(`
        .${WRAPPER}{
            --advanced-padding-top: ${attributes?.advancedPadding?.top};
            --advanced-padding-right: ${attributes?.advancedPadding?.right};
            --advanced-padding-bottom: ${attributes?.advancedPadding?.bottom};
            --advanced-padding-left: ${attributes?.advancedPadding?.left};
        }
    `);
}

export default style;