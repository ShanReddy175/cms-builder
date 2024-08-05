export default function setTimeoutAsync(timeout) {
    return new Promise((resolve, reject) => {
        try {
            window.setTimeout(() => {
                resolve();
            }, timeout, []);
        } catch (error) {
            reject(error);
        }
    });
  }