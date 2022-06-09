const dummy = (blogs) => {
    return 1
    // ...
}
//If the length of the array is 0 then we return 0, all other cases uses reduce method 
const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => sum + item.likes, 0)
}

module.exports = {
    dummy,
    totalLikes,
}