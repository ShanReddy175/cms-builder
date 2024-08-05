/**
 * Generate a string of random lowercase alphabets.
 * @param {Number} count - Number of alphabets to generate.
 * @returns {String} - Random lowercase alphabet string.
 */
async function createDynamicAlphabets(count = 5) {
    let alphabets = '';
    for (let i = 0; i < count; i++) {
        const randomCharcode = 97 + Math.floor(Math.random() * 26); // 'a' is 97 in ASCII
        alphabets += String.fromCharCode(randomCharcode);
    }
    return alphabets;
}

/**
 * Create a unique dynamic ID.
 * @param {String} type - Element type.
 * @param {Number} count - Number of random alphabets to include.
 * @param {Boolean} reloaded - Indicates if the ID creation is a retry.
 * @returns {String} - A unique dynamic ID.
 */
export async function createDynamicID(type = "div", count = 5, reloaded = false) {
    const dragElements = document.querySelectorAll(`[data-id="cms__template__editor"] *`);
    try {
        const timestamp = Date.now();
        let dynamicID = `cms-${type.toLowerCase()}-${await createDynamicAlphabets(count)}-${timestamp}`;
        
        if (reloaded) {
            dynamicID = `cms-${type.toLowerCase()}-${await createDynamicAlphabets(count)}-${timestamp}`;
        }

        const isIdUnique = ![...dragElements].some(ele => ele.getAttribute('data-id') === dynamicID);
        if (!isIdUnique) {
            return await createDynamicID(type, count, true);
        }
        return dynamicID;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw the error to ensure the calling code is aware of the failure
    }
};
