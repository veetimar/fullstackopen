const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let maxblog = blogs[0]
  for (let blog of blogs) {
    if (blog.likes > maxblog.likes) {
      maxblog = blog
    }
  }
  return maxblog
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
