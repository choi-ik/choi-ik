const fs = require("fs");
const dayjs = require("dayjs");
const Parser = require("rss-parser");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

let text = `
### Experience
프로그래머스 프론트엔드 데브코스 5기

<h3>Skill</h3>

[![My Skills](https://skillicons.dev/icons?i=ts,react&theme=dark)](https://skillicons.dev)

## 블로그 최신글
`;

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://choi-ik.tistory.com/rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);

    text += `${i + 1}. <a href=${link}>${title}</a></br> \n`;
  }

  // README.md 파일 작성
  fs.writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
