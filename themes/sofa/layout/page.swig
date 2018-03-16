<div class="main">
    <div class="pg-artical " id="pg-artical">
        <div class="wrap">
            <div class="nav-section">
                <div class="navbar">
                    <span class="larkicon larkicon-toc"></span>
                </div>
                <nav class="nav-container">
                    <ul class="catalog">
        <li class="current-book">
          <span class="name">SOFA-ARK</span>
        

        </li>
        
        {{ partial('partial/sidebar') }}
      
    </ul>
  </nav>
</div>
        <div class="main-container">
          <div id="page-toc"></div>
          <div class="artical-section larksite">
    <div class="doc-article">
      <article class="doc-article-inner">
        <div class="typo">
          <h1 class="typo-title" itemprop="title">
          {{ page.title }}
          </h1>
          <div class="typo-content">
            {{ page_anchor(page.content) }}
          </div>
        </div>
      </article>
    </div>
  </div>
        </div>
      </div>
    </div>
    <div class="mask hidden"></div>
  

  <script src="https://gw.alipayobjects.com/as/g/lark/site-toc/2.0.9/toc.js"></script>
<script>
  $('#page-toc').generateToc({
    contentContainer: $('.typo'),
    hasFirstLevelHeader: false,
    offsetTop: 0,
    affix: {
      bgColor: "transparent",
    },
  })
</script>



    </div>


