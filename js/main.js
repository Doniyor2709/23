import { ENDPOINT, LIMIT } from "./const.js";
import fetch from "./fetch.js";

const postsRow = document.querySelector(".posts-row");
const searchInput = document.querySelector("input");
const totalPosts = document.querySelector(".total-posts");


let search = "";
let activePage = 1;
async function getPosts() {
  try {
    let params = {
      q: search,
      _page: activePage,
      _limit: LIMIT,
    };
    const query = new URLSearchParams(params);

    postsRow.innerHTML = "Loading...";
    const p1 = fetch(`${ENDPOINT}users`);
    const p2 = fetch(`${ENDPOINT}${search ? "search/" : ""}users?${search? `q=${search}&` : ""}page=${activePage}&per_page=8`);


    const [posts, pgtnPosts] = await Promise.all([p1, p2]);
    let pages = Math.ceil(pgtnPosts.total_count / LIMIT);


    totalPosts.textContent = (search? pgtnPosts.total_count : pgtnPosts.length);
    postsRow.innerHTML = "";
    console.log(pgtnPosts);
    if (posts.length) {
       (search? pgtnPosts.items : pgtnPosts).map((post) => {
          postsRow.innerHTML += `
         <a href="#">
            <div class="users">
               <img style="width:200px" src="${post.avatar_url}" alt="">
               <h3 class="user_login">@${post.login}</h3>
               <h6 class="user_id">id:${post.id}</h6>
            </div>
         </a>    
         `;
      });
    } else {
      postsRow.innerHTML = "No posts";
    }
  } catch (err) {
    alert(err);
  }
}

getPosts();

searchInput.addEventListener("keyup", function () {
  search = this.value;
  activePage = 1;
  getPosts();
});



