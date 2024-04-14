function randomPop(array) {
    if (array.length === 0) {
        throw new Error('Cannot pop from an empty array.');
    }
    const index = Math.floor(Math.random() * array.length); // Generate a random index
    return array.splice(index, 1)[0]; // Remove the item at the random index and return it
}
