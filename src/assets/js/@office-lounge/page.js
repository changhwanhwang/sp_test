// kv
// function KeyVisuals($container, data) {
//   const template = `
//   <div class="content-box">
//     <div class="video-box">
//         <div id="video00" data-vimeo-url="${data.kv.url}" style="width: 100%; height: 100%;"></div>
//       <span class="sr-only">${data.kv.alt}</span>
//     </div>
//     <div class="btn-scroll">
//       <div class="img-box">
//         <img src="../../assets/img/office/scroll-arrow.svg" alt="스크롤 유도 버튼" />
//       </div>
//     </div>
//   </div>
//   `;

//   $container.append(template);
// }
// app
function secApp($container, data) {
  const appListItems = data.app.list.map((item) => `<li class="app-item">${item}</li>`).join("");
  const template = `
  <div class="content-box">
    <div class="text-box">
      <h2 class="p-title">${data.app.title}</h2>
      <ul class="app-list">
      ${appListItems}
      </ul>
    </div>
    <div class="video-box">
      <div id="${data.app.video.id}" class="video" data-vimeo-url="${data.app.video.url}" style="width: 100%; height: 100%;" alt="스파크플러스 앱 목업 영상"></div>
      <div class="video-thumbnail">
        <div class="img-box">
          <picture>
            <source srcset="../../assets/img/@office-lounge/video-main.png" media="(min-width: 769px)" />
            <source srcset="../../assets/img/@office-lounge/video-main-mo.png" media="(max-width: 768px)" />
            <img src="../../assets/img/@office-lounge/video-main.png" alt="앱 영상 썸네일" />
          </picture>
        </div>
      </div>
      <div class="video-thumbnail-bg">
        <div class="img-box">
          <picture>
            <source srcset="../../assets/img/@office-lounge/video-main.png" media="(min-width: 769px)" />
            <source srcset="../../assets/img/@office-lounge/video-main-mo.png" media="(max-width: 768px)" />
            <img src="../../assets/img/@office-lounge/video-main.png" alt="앱 영상 썸네일" />
          </picture>
        </div>
      </div>
      <div class="video-control-btn">
        <button class="btn-video-play" title="클릭 시 영상 재생"></button>
      </div>
    </div>
  </div>
  `;
  $container.append(template);
}

function questions($container, data) {
  const template = `
    <div class="inner">
      <h3 class="p-title-center">자주 묻는 질문</h3>
      <ul class="question-list">
        ${data.questionList
          .map(
            (item, index) => `
          <li class="question-item question">
            <p class="question-title">${item.question}</p>
          </li>
          <li class="question-item answer">
            <p class="question-title">${item.answer}</p>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
  $container.append(template);
}
