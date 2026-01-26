<template>
  <div class="home-modern">
    <!-- Carousel Section (Kept Original Banners) -->
    <section>
      <div id="myCarousel" class="carousel slide shadow-sm" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <!-- slide 1: Original style restored -->
          <div class="carousel-item active">
            <img src="@/assets/background1.png" alt="UPC" class="w-100 img-repeat d-none d-md-block" style="height: 350px;">
            <img src="@/assets/background1.png" alt="UPC" class="w-100 img-repeat d-block d-md-none" style="height: 250px;">

            <div class="container">
              <div class="carousel-caption">
                <h1 class="display-4 display-md-3">
                  DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span>
                  <img src="@/assets/logo-crossref.png" class="mx-3 mb-2 d-none d-sm-inline" width="30" alt="Logo">
                  <img src="@/assets/logo-crossref.png" class="mx-2 mb-1 d-inline d-sm-none" width="20" alt="Logo">
                </h1>
                <p class="d-none d-sm-block">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
                <p class="d-block d-sm-none small">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
                <p>
                  <router-link to="/doi" class="btn btn-lg btn-dark d-none d-sm-inline-block">
                    {{ $t("DOI Search") }}
                  </router-link>
                  <router-link to="/doi" class="btn btn-sm btn-dark d-inline-block d-sm-none">
                    {{ $t("DOI Search") }}
                  </router-link>
                </p>
              </div>
            </div>
          </div>
          <!-- slide 2: Same style as first but for AI -->
          <div class="carousel-item">
            <img src="@/assets/background3.jpg" alt="UPC" class="w-100 img-repeat d-none d-md-block" style="height: 350px;">
            <img src="@/assets/background3.jpg" alt="UPC" class="w-100 img-repeat d-block d-md-none" style="height: 250px;">

            <div class="container">
              <div class="carousel-caption">
                <h1 class="display-4 display-md-3">
                  AI <span style="color: #4f5858; font-weight: bold;">Innovation Lab</span>
                  <i class="bi bi-robot mx-3 mb-2 d-none d-sm-inline" style="font-size: 2rem;"></i>
                </h1>
                <p class="text-dark d-none d-sm-block">{{ $t("Advanced semantic analysis and Innovation Radar with AI") }}</p>
                <p class="text-dark d-block d-sm-none small">{{ $t("Trends and deep analysis with AI") }}</p>
                <p>
                  <router-link to="/radar" class="btn btn-lg btn-dark d-none d-sm-inline-block">
                    {{ $t("Explore Trends") }}
                  </router-link>
                  <router-link to="/radar" class="btn btn-sm btn-dark d-inline-block d-sm-none">
                    {{ $t("Explore Trends") }}
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <div class="container py-5">
      <!-- Feature Cards Section (Kept Icons, modernized cards) -->
      <div class="row g-4 mt-2 mb-5">
        <!-- Card 1 -->
        <div class="col-lg-4 col-md-6">
          <router-link to="/prefix/info" class="text-decoration-none h-100">
            <div class="modern-tool-card h-100">
              <div class="card-icon-wrapper me-4">
                <div class="circle-yellow shadow-sm">
                  <i class="bi bi-clipboard-data text-light" style="font-size: 2.2rem;"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold text-dark mb-1">{{ $t("Prefix: Member Information") }}</h5>
                <p class="text-muted mb-0 lh-sm">{{$t("Prefix: Member Information Description")}}</p>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Card 2 -->
        <div class="col-lg-4 col-md-6">
          <router-link to="/prefix/dois" class="text-decoration-none h-100">
            <div class="modern-tool-card h-100">
              <div class="card-icon-wrapper me-4">
                <div class="circle-dark shadow-sm">
                  <i class="bi bi-list-check text-light" style="font-size: 2.2rem;"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold text-dark mb-1">{{ $t("Prefix: DOI List") }}</h5>
                <p class="text-muted mb-0 lh-sm">{{ $t("Prefix: DOI List Description") }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Card 3: AI Lab Teaser -->
        <div class="col-lg-4 col-md-6">
          <router-link to="/radar" class="text-decoration-none h-100">
            <div class="modern-tool-card h-100">
              <div class="card-icon-wrapper me-4">
                <div class="circle-yellow shadow-sm">
                  <i class="bi bi-robot text-light" style="font-size: 2.2rem;"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold text-dark mb-1">{{ $t("AI Innovation Lab") }}</h5>
                <p class="text-muted mb-0 lh-sm">{{ $t("AI Lab Short Description") }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Card 4 -->
        <div class="col-lg-4 col-md-6">
          <router-link to="/prefix/referenced/dois" class="text-decoration-none h-100">
            <div class="modern-tool-card h-100">
              <div class="card-icon-wrapper me-4">
                <div class="circle-dark shadow-sm">
                  <i class="bi bi-graph-up-arrow text-light" style="font-size: 2.2rem;"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold text-dark mb-1">{{ $t("Prefix: DOIs and ORCIDs") }}</h5>
                <p class="text-muted mb-0 lh-sm">{{ $t("Prefix: DOIs and ORCIDs Description") }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Card 5 -->
        <div class="col-lg-4 col-md-6">
          <router-link to="/members" class="text-decoration-none h-100">
            <div class="modern-tool-card h-100">
              <div class="card-icon-wrapper me-4">
                <div class="circle-yellow shadow-sm">
                  <i class="bi bi-person-bounding-box text-light" style="font-size: 2.2rem;"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold text-dark mb-1">{{ $t("Member Search") }}</h5>
                <p class="text-muted mb-0 lh-sm">{{ $t("Member Search Description") }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Card 6 -->
        <div class="col-lg-4 col-md-6">
          <router-link to="/doi" class="text-decoration-none h-100">
            <div class="modern-tool-card h-100">
              <div class="card-icon-wrapper me-4">
                <div class="circle-dark shadow-sm">
                  <i class="bi bi-search text-light" style="font-size: 2.2rem;"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold text-dark mb-1">{{ $t("DOI Search") }}</h5>
                <p class="text-muted mb-0 lh-sm">{{ $t("DOI Search Description") }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- NEW AI LAB FULL WIDTH SECTION -->
      <div class="row">
        <div class="col-12 px-3 pb-5">
          <div class="ai-master-card p-4 p-md-5 rounded-5 shadow-lg overflow-hidden position-relative animate__animated animate__fadeInUp">
            <div class="ai-card-glow"></div>
            <div class="row align-items-center position-relative z-1">
              <div class="col-lg-7 text-white">
                <div class="d-inline-flex align-items-center badge bg-primary bg-opacity-25 border border-primary border-opacity-50 text-white rounded-pill px-3 py-2 mb-4">
                  <i class="bi bi-lightning-charge-fill me-2 text-warning"></i>
                  {{ $t("AI Generated") }}
                </div>
                <h2 class="display-4 fw-bold mb-3">{{ $t("AI Innovation Lab") }}</h2>
                <p class="lead mb-4 opacity-75">
                  {{ $t("AI Lab Description") }}
                </p>
                <div class="row g-3">
                  <div class="col-md-6">
                    <router-link to="/radar" class="btn btn-warning w-100 text-start py-3 px-4 rounded-4 shadow-sm h-100 d-flex align-items-center justify-content-between ai-action-btn">
                      <div>
                        <div class="fw-bold">{{ $t("Innovation Radar") }}</div>
                        <div class="small opacity-75">{{ $t("Weekly Trends") }}</div>
                      </div>
                      <i class="bi bi-bullseye fs-3"></i>
                    </router-link>
                  </div>
                  <div class="col-md-6">
                    <router-link to="/daily-analysis" class="btn btn-outline-light w-100 text-start py-3 px-4 rounded-4 h-100 d-flex align-items-center justify-content-between ai-action-btn">
                      <div>
                        <div class="fw-bold">{{ $t("Daily Scientific Analysis") }}</div>
                        <div class="small opacity-75">{{ $t("Deep daily analysis") }}</div>
                      </div>
                      <i class="bi bi-activity fs-3"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 d-none d-lg-flex justify-content-center">
                <div class="ai-visual-box shadow-lg">
                  <i class="bi bi-robot display-1 text-white opacity-25"></i>
                  <div class="data-stream"></div>
                  <div class="data-stream s2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <!-- Fixed Background -->
    <div id="fixed"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-modern {
  background-color: #fcfcfc;
}

/* Glass Caption on Carousel */
.glass-caption {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.text-warning-shadow {
  color: #fcb520;
  text-shadow: 0 0 15px rgba(252, 181, 32, 0.4);
}

.text-primary-shadow {
  color: #0d6efd;
  text-shadow: 0 0 15px rgba(13, 110, 253, 0.4);
}

/* Modern Tool Cards */
.modern-tool-card {
  background: white;
  padding: 1.5rem 1.8rem;
  border-radius: 1.5rem;
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  text-align: left;
  display: flex;
  align-items: center;
}

.modern-tool-card h5 {
  font-weight: 600;
  font-size: 1.25rem;
  color: #111827;
  margin-bottom: 0.25rem;
}

.modern-tool-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
}

.modern-tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  border-color: #fcb52050;
}

.card-icon-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
}

.circle-yellow {
  width: 70px;
  height: 70px;
  background-color: #fcb520;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.circle-dark {
  width: 70px;
  height: 70px;
  background-color: #333;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.modern-tool-card:hover .circle-yellow, 
.modern-tool-card:hover .circle-dark {
  transform: scale(1.1) rotate(5deg);
}

/* AI Master Card Section */
.ai-master-card {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  min-height: 400px;
}

.ai-card-glow {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(13, 110, 253, 0.15) 0%, transparent 70%);
  z-index: 0;
}

.ai-visual-box {
  width: 250px;
  height: 250px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: pulse 4s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(13, 110, 253, 0.1); }
  50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(13, 110, 253, 0.2); }
}

.ai-action-btn {
  transition: all 0.3s ease;
}

.ai-action-btn:hover {
  transform: translateY(-5px);
  filter: brightness(1.1);
}

.img-repeat {
  object-fit: cover;
  object-position: center;
}

.z-1 { z-index: 1; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-4 { font-size: 2.2rem; }
  .modern-tool-card { padding: 1.5rem; }
  .circle-yellow, .circle-dark { width: 60px; height: 60px; }
  .ai-master-card { text-align: center; }
  .ai-action-btn { justify-content: center; }
}
</style>
