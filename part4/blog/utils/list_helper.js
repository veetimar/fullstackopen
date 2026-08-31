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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const numberOfBlogs = {}
  for (let blog of blogs) {
    let author = blog.author
    if (!numberOfBlogs.hasOwnProperty(author)) {
      numberOfBlogs[author] = 0
    }
    numberOfBlogs[author] += 1
  }

  let maxauthor = ""
  let maxblog = 0
  for (let author in numberOfBlogs) {
    if (numberOfBlogs[author] > maxblog) {
      maxblog = numberOfBlogs[author]
      maxauthor = author
    }
  }
  return { author: maxauthor, blogs: maxblog }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likes = {}
  for (let blog of blogs) {
    let author = blog.author
    if (!likes.hasOwnProperty(author)) {
      likes[author] = 0
    }
    likes[author] += blog.likes
  }

  let maxauthor = ""
  let maxlikes = 0
  for (let author in likes) {
    if (likes[author] > maxlikes) {
      maxlikes = likes[author]
      maxauthor = author
    }
  }
  return { author: maxauthor, likes: maxlikes }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
