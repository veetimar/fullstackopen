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

  const authors = {}
  for (let blog of blogs) {
    let author = blog.author
    if (!authors.hasOwnProperty(author)) {
      authors[author] = 0
    }
    authors[author] += 1
  }

  let maxauthor = ""
  let maxblog = 0
  for (let author in authors) {
    if (authors[author] > maxblog) {
      maxblog = authors[author]
      maxauthor = author
    }
  }
  return { author: maxauthor, blogs: maxblog }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
