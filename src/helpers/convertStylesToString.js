export const stylesToString = (styles) => {
    return Object.entries(styles)
        .map(([key, value]) => {
            const kebabCaseKey = key.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
            return `${kebabCaseKey}: ${value};`;
        })
        .join(' ');
};