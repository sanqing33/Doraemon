const newsService = require("../services/newsService");
const dateFunction = require("../utils/Date");

// 查询新闻列表
const getNewsList = (req, res, next) => {
  newsService.getNewsList((err, newsArr) => {
    if (err) {
      return res.send({ state: 1, message: err });
    }
    return res.send({ state: 0, message: "查询成功", data: newsArr });
  });
};

// 分页查询新闻列表
const getNewsByPage = (req, res, next) => {
  const { page, size } = req.query;
  newsService.getNewsByPage(page, size, (err, newsArr, total) => {
    if (err) {
      return res.send({ state: 1, message: err });
    }
    return res.send({
      state: 0,
      message: "查询成功",
      data: { newsArr, total },
    });
  });
};

// 根据id查询新闻详情
const getNewsById = (req, res, next) => {
  const id = req.query.id;
  newsService.getNewsById(id, (err, news) => {
    if (err) {
      return res.send({ state: 1, message: err });
    }
    return res.send({ state: 0, message: "查询成功", data: news });
  });
};

// 新增新闻
const insertNews = (req, res, next) => {
  const { title, content, coverUrl, region, publisher, date, status } =
    req.body;
  const news = {
    title,
    content,
    coverUrl,
    region,
    publisher,
    date: dateFunction(),
    status,
  };

  newsService.insertNews(news, (err, result) => {
    if (err) {
      return res.send({ state: 1, message: err });
    }
    return res.send({ state: 0, message: "新增成功", data: result });
  });
};

// 图片上传
const upload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ errno: 1, message: "上传失败" });
  }
  const imagesUrl =
    "http://localhost:3000/uploads/images/news/" + req.file.filename;
  res.send({
    errno: 0,
    data: {
      url: imagesUrl,
      alt: "",
      href: req.file.filename,
    },
  });
  imagesUrl = [];
};

module.exports = {
  getNewsList,
  getNewsByPage,
  getNewsById,
  insertNews,
  upload,
};
