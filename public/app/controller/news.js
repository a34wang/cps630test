const originalNewsFollowing = ["CANADIAN RED CROSS", "The Salvation Army"];
let newsFollowing = originalNewsFollowing.map(following => {
  return following; //If want to transform array
}); 

const newsApiKey = "7baf4530cad8435fbfcbd1303e3da391";

const numbToFetch = 5;

class News {
  constructor(name) {
    this.url = `https://newsapi.org/v2/everything?q=${name}&apiKey=${newsApiKey}`;
    console.log(this.url);
    this.newsStories = this.getNews();
  }
  async getNews() {
    let stories = [];
    return new Promise((resolve, reject) => {
      let apiReq, newsData, jsonText;
      apiReq = new XMLHttpRequest();
      apiReq.open("GET", this.url, true);
      apiReq.onreadystatechange = () => {
        if (apiReq.readyState === 4) {
          if (apiReq.status === 200) {
            jsonText = apiReq.responseText;
            newsData = JSON.parse(jsonText);
            stories = [...newsData["articles"].slice(0, numbToFetch)];

            resolve(stories);
          } else {
            reject(apiReq.status);
          }
        }
      };
      apiReq.send();
    });
  }
  async isNewsLoaded() {
    const news = await this.newsStories;
    return news != null;
  }
}

let news = [];
async function fetchAllNews() {
  await Promise.all(
    newsFollowing.map(async following => {
      const newsSection = new News(following);
      await newsSection.isNewsLoaded();
      return newsSection.newsStories;
    })
  )
    .then(values => {
      news = values.flat();
      console.log(news);
    })
    .catch(() => {
      document.getElementById("errormessage").innerHTML = "No news to print";
    });
  for (i = 0; i < newsFollowing.length; i++) {
    console.log(i);
    createNewsSection(i);
    for (j = 0; j < numbToFetch; j++) {
      let indexValue = i * numbToFetch + j;
      createNewsModule(
        i,
        j,
        news[indexValue].title,
        news[indexValue].urlToImage,
        news[indexValue].url
      );
    }
  }
}

function createNewsSection(idNumb) {
  section = document.createElement("section");
  section.classList.add("news-sections");
  section.id = `new-section-${idNumb}`;

  let sectionCover = document.createElement("div");
  sectionCover.classList.add("section-cover");
  sectionCover.id = `section-cover-${idNumb}`;
  sectionCover.addEventListener("click", e => {
    for (let siblings of e.target.parentNode.children) {
      console.log(siblings.style.position);
      if (siblings.style.position == "absolute") {
        undoExpand(siblings);
      }
    }
  });

  let sectionTitle = document.createElement("h2");
  sectionTitle.classList.add("section-title");
  sectionTitle.innerHTML = originalNewsFollowing[idNumb];

  section.appendChild(sectionTitle);
  section.appendChild(sectionCover);
  document.getElementById("main-container").appendChild(section);
}

// newSection takes the search newsFollowing value, idNumb = news counter starting at 0, news title, image link
function createNewsModule(newsSection, idNumb, title, imgLink, sourceLink) {
  let section, figure, img, figcaption, caption;
  section = document.createElement("div");
  section.classList.add("minor-news");
  section.id = `news${idNumb}`;

  figure = document.createElement("figure");
  figure.addEventListener("click", expandToggle);

  img = document.createElement("img");
  img.src = imgLink;

  link = document.createElement("a");
  link.classList.add("news-link");
  link.id = `link${idNumb}`;
  link.innerHTML = "SOURCE";
  link.href = sourceLink;

  figure.appendChild(img);
  figure.innerHTML += title;

  section.appendChild(figure);

  document.getElementById(`new-section-${newsSection}`).appendChild(section);
  document.getElementById(`new-section-${newsSection}`).appendChild(link);
  console.log("z");
}

function closestParentbyClass(el, className) {
  if (el.parentNode.classList.contains(className)) {
    return el.parentNode;
  } else {
    return closestParentbyClass(el.parentNode, className);
  }
}

function expandToggle(e) {
  const news = closestParentbyClass(e.target, "minor-news");
  if (news.style.position != "absolute") {
    hoverExpand(e);
  }
}

function hoverExpand(e) {
  const news = closestParentbyClass(e.target, "minor-news");
  news.style.width =
    parseFloat(window.getComputedStyle(news).width) * 1.5 + "px";
  news.style.height =
    parseFloat(window.getComputedStyle(news).height) * 1.5 + "px";
  news.style.position = "absolute";
  news.style.zIndex = 11;
  const newsSec = closestParentbyClass(news, "news-sections");
  const intId = news.id.replace(/\D/g, "");
  document.querySelector(`#${newsSec.id} > .section-cover`).style.display =
    "block";
  document.querySelector(`#${newsSec.id} > #link${intId}`).style.display =
    "block";
}

function undoExpand(e) {
  let news = e;
  news.style.width =
    parseFloat(window.getComputedStyle(news).width) / 1.5 + "px";
  news.style.height =
    parseFloat(window.getComputedStyle(news).height) / 1.5 + "px";
  news.style.position = "static";
  news.style.zIndex = 1;
  const newsSec = closestParentbyClass(news, "news-sections");
  const intId = news.id.replace(/\D/g, "");
  document.querySelector(`#${newsSec.id} > .section-cover`).style.display =
    "none";
  document.querySelector(`#${newsSec.id} > #link${intId}`).style.display =
    "none";
}

function isOverflow(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

//window.addEventListener("load", fetchAllNews);
