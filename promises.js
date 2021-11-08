const promiseExample = async () => {
    const promise = new Promise((resolve) => {
        console.log("Mimicking an API call to something else.")
        setTimeout(() => resolve("Retrieved Data"), 4000)
    });

    try {
        const result = await promise;
        console.log(result);
        console.log('Successfully waited for data');
    } catch (err) {
        console.log(err);
    }
}

promiseExample();