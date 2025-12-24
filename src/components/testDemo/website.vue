<template>
  <div id="website-container">
    <!-- Fixed Right Side Panel -->
    <div class="fixed-right-panel">
      <div class="fixed-action-btn inquiry-fixed" title="Get Quote">
        <el-icon>
          <ChatDotRound />
        </el-icon>
      </div>
      <div class="fixed-action-btn customer-service" title="Customer Service">
        <el-icon>
          <Headset />
        </el-icon>
      </div>
      <div class="fixed-action-btn back-to-top" title="Back to Top" @click="scrollToTop">
        <el-icon>
          <Top />
        </el-icon>
      </div>
    </div>

    <!-- Header Section -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <div class="logo-image-placeholder">
          </div>
        </div>
        <nav class="nav">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
        <div class="contact-info">
          <div class="contact-item">
            <el-icon>
              <Message />
            </el-icon>
            <span>engineer@minnuogas.com</span>
          </div>
          <div class="social-icons">
            <div class="social-icon" title="Facebook">
              <el-icon>
                <Platform />
              </el-icon>
            </div>
            <div class="social-icon" title="LinkedIn">
              <el-icon>
                <Link />
              </el-icon>
            </div>
            <div class="social-icon" title="YouTube">
              <el-icon>
                <VideoPlay />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="fade-in-up">We are Expert in Design & Produce Gas Plant</h1>
            <p class="fade-in-up delay-1">Air Separation Unit • PSA Oxygen Plant • VPSA Oxygen Plant • PSA Nitrogen
              Plant • Liquid Nitrogen Plant</p>
            <div class="hero-stats fade-in-up delay-2">
              <div class="stat floating">
                <h3>120M RMB</h3>
                <p>Registered Capital</p>
              </div>
              <div class="stat floating delay-1">
                <h3>90+</h3>
                <p>Countries Served</p>
              </div>
              <div class="stat floating delay-2">
                <h3>1.5B RMB</h3>
                <p>2024 Export Value</p>
              </div>
            </div>
            <button class="cta-hero-button pulse">
              <i class="el-icon-phone"></i>
              Get Free Quote Now
            </button>
          </div>
          <div class="hero-image">
            <div class="product-showcase">
              <!-- Placeholder for main product image -->
              <div class="main-product-image"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <div class="about-header">
          <div class="about-image-placeholder">
          </div>
          <div class="about-content">
            <h2>About Us</h2>
            <p>We are familiar with PSA, VPSA, air separation technology, and our customers range from small producers
              to
              government healthcare. We provide best-in-class gas production solutions worldwide. Offering installation,
              remote intelligent operation of machines, our flexible and personalized care is highly appreciated by our
              customers.</p>
          </div>
        </div>
        <div class="about-features">
          <div class="feature">
            <div class="feature-icon">
              <el-icon>
                <Trophy />
              </el-icon>
            </div>
            <h3>66+ Years</h3>
            <p>Technical Experience</p>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <el-icon>
                <OfficeBuilding />
              </el-icon>
            </div>
            <h3>6</h3>
            <p>Subsidiaries</p>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <el-icon>
                <Opportunity />
              </el-icon>
            </div>
            <h3>Global</h3>
            <p>Customer Network</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
      <div class="container">
        <h2>Meet Your Needs</h2>
        <p class="section-subtitle">The Oxygen, Nitrogen, Ozone, CO2 .... Gas Solution</p>
        <div class="products-grid">
          <div class="product-card hover-lift">
            <div class="product-image-placeholder1"></div>
            <div class="product-content">
              <h3>VPSA Oxygen Generator</h3>
              <p>Minuo Group specializes in the research and development, design and manufacture of VPSA oxygen
                generating units to maximize cost savings for customers at the lowest price.</p>
              <div class="product-actions">
                <button class="inquiry-btn">
                  <i class="el-icon-message"></i>
                  Inquiry Now
                </button>
                <button class="details-btn">
                  <i class="el-icon-view"></i>
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="product-card hover-lift">
            <div class="product-image-placeholder2"></div>
            <div class="product-content">
              <h3>PSA Oxygen Generator</h3>
              <p>PSA oxygen generator Manufacturer, factory direct sales, metallurgical combustion, bio oxygen
                generator, oxygen generator for fishing farm, sewage treatment, provide you with fast pure oxygen.</p>
              <div class="product-actions">
                <button class="inquiry-btn">
                  <i class="el-icon-message"></i>
                  Inquiry Now
                </button>
                <button class="details-btn">
                  <i class="el-icon-view"></i>
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="product-card hover-lift">
            <div class="product-image-placeholder3"></div>
            <div class="product-content">
              <h3>Liquid / Cryogenic Oxygen Plant</h3>
              <p>Industrial air separation cryogenic oxygen plant. Low energy consumption of oxygen production, stable
                performance of adsorbent and valve, high reliability, providing operational status monitoring and remote
                technical service.</p>
              <div class="product-actions">
                <button class="inquiry-btn">
                  <i class="el-icon-message"></i>
                  Inquiry Now
                </button>
                <button class="details-btn">
                  <i class="el-icon-view"></i>
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="product-card hover-lift">
            <div class="product-image-placeholder4"></div>
            <div class="product-content">
              <h3>Medical Air Plant</h3>
              <p>MINNUO air compressor systems, specifically designed for critical medical environments such as
                operating rooms, ICUs, and anesthesia rooms, feature intelligent control and smart connectivity.</p>
              <div class="product-actions">
                <button class="inquiry-btn">
                  <i class="el-icon-message"></i>
                  Inquiry Now
                </button>
                <button class="details-btn">
                  <i class="el-icon-view"></i>
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="product-card hover-lift">
            <div class="product-image-placeholder5"></div>
            <div class="product-content">
              <h3>Medical Vacuum Plant</h3>
              <p>The MINNUO medical vacuum suction system offers stable, continuous negative pressure support, ensuring
                safe environments in critical areas like operating rooms and ICUs.</p>
              <div class="product-actions">
                <button class="inquiry-btn">
                  <i class="el-icon-message"></i>
                  Inquiry Now
                </button>
                <button class="details-btn">
                  <i class="el-icon-view"></i>
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="product-card hover-lift">
            <div class="product-image-placeholder6"></div>
            <div class="product-content">
              <h3>PSA Nitrogen Plant</h3>
              <p>High-purity nitrogen generation systems for various industrial applications with reliable performance
                and cost-effective operation.</p>
              <div class="product-actions">
                <button class="inquiry-btn">
                  <i class="el-icon-message"></i>
                  Inquiry Now
                </button>
                <button class="details-btn">
                  <i class="el-icon-view"></i>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
      <div class="container">
        <h2>QUICK TURNAROUND TIME</h2>
        <p class="section-subtitle">Value Added Service</p>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <el-icon>
                <TrendCharts />
              </el-icon>
            </div>
            <h3>Return On Investment</h3>
            <p>We provide top quality gas production plant at good price. Payback in six months at the earliest</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <el-icon>
                <Van />
              </el-icon>
            </div>
            <h3>Shipping</h3>
            <p>Arrange low-cost transportation for customers to save logistics costs</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <el-icon>
                <DataAnalysis />
              </el-icon>
            </div>
            <h3>Solution</h3>
            <p>Recommend the right model according to different applications, gas output and purity</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <el-icon>
                <Setting />
              </el-icon>
            </div>
            <h3>Custom Design</h3>
            <p>Free gas design solutions for different requirements.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <el-icon>
                <Tools />
              </el-icon>
            </div>
            <h3>Install & Training</h3>
            <p>On-site installation, detailed operation and maintenance training. Long-term guidance service.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <el-icon>
                <MapLocation />
              </el-icon>
            </div>
            <h3>Plant Layout</h3>
            <p>How to arrange a layout for Oxygen plant, Nitrogen Plant, Ozone Plant</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cost Estimation Section -->
    <section class="cost-estimation">
      <div class="container">
        <h2>Estimate Cost</h2>
        <p class="section-subtitle">How Much Set Up Oxygen / Nitrogen Plant Cost ?</p>
        <div class="cost-grid">
          <div class="cost-card">
            <h3>PSA Oxygen Plant</h3>
            <div class="price">$50,000</div>
            <p>20 m³/h oxygen capacity</p>
            <ul>
              <li>20GP container included</li>
              <li>No foundation required</li>
              <li>One button start</li>
              <li>Payback time: 1-2 years</li>
            </ul>
          </div>
          <div class="cost-card">
            <h3>PSA Nitrogen Plant</h3>
            <div class="price">$12,000</div>
            <p>20m³/h, purity 99.999%</p>
            <ul>
              <li>ROI: 6-18 months</li>
              <li>Quick payback</li>
              <li>High purity output</li>
              <li>Low maintenance</li>
            </ul>
          </div>
          <div class="cost-card">
            <h3>Air Separation Unit</h3>
            <div class="price">$100,000+</div>
            <p>300-50,000 Nm3/h range</p>
            <ul>
              <li>Large scale production</li>
              <li>Competitive pricing</li>
              <li>Free design solutions</li>
              <li>Low maintenance cost</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials">
      <div class="container">
        <h2>Testimonials</h2>
        <p class="section-subtitle">Our Clients Say About Us</p>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="client-avatar1">
              </div>
              <div class="rating">
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
              </div>
            </div>
            <p>"Nobita is the best technology engineer of PSA oxygen plant. He has been working in this field for many
              years and has a lot of experience. He always comes up with innovative ideas that help improve the
              efficiency of the plant. His expertise convinced me of their strength"</p>
            <div class="author">
              <strong>Walter M. Bing</strong>
              <span>Manager</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="client-avatar2">
              </div>
              <div class="rating">
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
                <el-icon>
                  <StarFilled />
                </el-icon>
              </div>
            </div>
            <p>"I am so glad to choose Minnuo. They are a professional factory and can help us produce a PSA oxygen
              plant. Their equipment is of high quality and their prices are very competitive. I highly recommend them
              to anyone looking for this type of product."</p>
            <div class="author">
              <strong>Shams W. Pawel</strong>
              <span>Founder & CEO</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="trust">
      <div class="container">
        <h2>Qualification Certificate Display</h2>
        <p class="section-subtitle">Where we are worthy of your trust</p>
        <div class="certificates-grid">
          <div class="certificate-item">
            <div class="certificate-image">
            </div>
          </div>
          <div class="certificate-item">
            <div class="certificate-image">
            </div>
          </div>
          <div class="certificate-item">
            <div class="certificate-image">
            </div>
          </div>
          <div class="certificate-item">
            <div class="certificate-image">
            </div>
          </div>
        </div>
        <div class="trust-content">
          <h3>Protect Your Money</h3>
          <h4>Quote Tips For Purchase</h4>
          <p>Gas equipment is not a small investment, and whether you order an oxygen generator, a nitrogen generator or
            a large air separation plant, price is of course the primary consideration. However, what you need to avoid
            is a low price and low quality machine.</p>
          <div class="tips-list">
            <div class="tip">
              <el-icon>
                <Check />
              </el-icon>
              Choose a company that is well known and has experience in exporting
            </div>
            <div class="tip">
              <el-icon>
                <Check />
              </el-icon>
              Choose a company that can provide a complete and reasonable design solution
            </div>
            <div class="tip">
              <el-icon>
                <Check />
              </el-icon>
              Choose a company that can visit your factory on site, or immediately inspect it by video
            </div>
            <div class="tip">
              <el-icon>
                <Check />
              </el-icon>
              Choose a company that can provide a complete operation, after-sales and maintenance program
            </div>
            <div class="tip">
              <el-icon>
                <Check />
              </el-icon>
              Choose a company that can provide after-sales service for you at any time
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2>Want to Know More Detailed?</h2>
        <p>Get Free Gas Solution</p>
        <button class="cta-button">Contact Us Now</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>MINNUO Group</h3>
            <p>Specializing in gas production solutions worldwide with 66+ years of experience.</p>
          </div>
          <div class="footer-section">
            <h4>Products</h4>
            <ul>
              <li>PSA Oxygen Plant</li>
              <li>VPSA Oxygen Plant</li>
              <li>Nitrogen Plant</li>
              <li>Air Separation Unit</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Custom Design</li>
              <li>Installation</li>
              <li>Training</li>
              <li>Maintenance</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>Email: engineer@minnuogas.com</p>
            <p>Phone: +86-xxx-xxxx-xxxx</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 MINNUO Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  ChatDotRound,
  Headset,
  Top,
  Message,
  Platform,
  Link,
  VideoPlay,
  Trophy,
  OfficeBuilding,
  Opportunity,
  TrendCharts,
  Van,
  DataAnalysis,
  Setting,
  Tools,
  MapLocation,
  StarFilled,
  Check
} from '@element-plus/icons-vue'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav a')
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')?.substring(1)
      if (targetId) {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    })
  })
})
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floating {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.delay-1 {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.delay-2 {
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 31, 96, 0.2);
}

/* Fixed Right Panel */
.fixed-right-panel {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 15px;
  display: none;
}

.fixed-action-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.inquiry-fixed {
  background: linear-gradient(135deg, #31a7c9, #f0f0f0);
  color: white;
}

.customer-service {
  background: linear-gradient(135deg, #001f60, #003399);
  color: white;
}

.back-to-top {
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  color: #001f60;
  border: 2px solid #001f60;
}

.fixed-action-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.fixed-action-btn .el-icon {
  font-size: 24px;
}

/* Header */
.header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.logo-image-placeholder {
  width: 200px;
  height: 60px;
  background-image: url('../../assets/img/mnlogo2.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: #001f60;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-size: 14px;
}

.contact-item .el-icon {
  color: #001f60;
  font-size: 16px;
}

.social-icons {
  display: flex;
  gap: 0.5rem;
}

.social-icon {
  width: 35px;
  height: 35px;
  background: linear-gradient(135deg, #001f60, #31a7c9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 31, 96, 0.3);
}

.social-icon .el-icon {
  font-size: 16px;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #001f60 0%, #31a7c9 100%);
  color: white;
  padding: 120px 0 80px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  text-align: left;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  line-height: 1.2;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.stat p {
  opacity: 0.8;
  font-size: 0.9rem;
}

.cta-hero-button {
  background: #31a7c9;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.cta-hero-button:hover {
  background: #001f60;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 0, 0, 0.3);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-showcase {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.main-product-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  position: relative;
  background-image: url('../../assets/img/dat.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* About Section */
.about {
  padding: 80px 0;
  background: #f9fafb;
}

.about-header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
}

.about-image-placeholder {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #001f60;
  font-weight: bold;
  font-size: 1.2rem;
  background-image: url('../../assets/img/img0.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 6px #31a7c9;
}

.about-content h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1f2937;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #6b7280;
}

.about-features {
  display: flex;
  justify-content: center;
  gap: 4rem;
  text-align: center;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #001f60, #31a7c9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.feature-icon:hover {
  transform: scale(1.1);
}

.feature-icon .el-icon {
  font-size: 32px;
}

.feature h3 {
  font-size: 2rem;
  color: #001f60;
  margin-bottom: 0.5rem;
}

/* Products Section */
.products {
  padding: 80px 0;
}

.products h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 3rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px #31a7c9;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px #31a7c9;
}

.product-image-placeholder1,
.product-image-placeholder2,
.product-image-placeholder3,
.product-image-placeholder4,
.product-image-placeholder5,
.product-image-placeholder6 {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1rem;
}

.product-image-placeholder1 {
  background-image: url('../../assets/img/1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.product-image-placeholder2 {
  background-image: url('../../assets/img/2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.product-image-placeholder3 {
  background-image: url('../../assets/img/3.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.product-image-placeholder4 {
  background-image: url('../../assets/img/4.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.product-image-placeholder5 {
  background-image: url('../../assets/img/5.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.product-image-placeholder6 {
  background-image: url('../../assets/img/6.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}


.product-content {
  padding: 1.5rem;
  min-height: 300px;

  p {
    min-height: 150px;
  }
}

.product-card h3 {
  color: #001f60;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.product-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.product-actions {
  display: flex;
  gap: 1rem;
}

.inquiry-btn {
  background: #31a7c9;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.inquiry-btn:hover {
  background: #001f60;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
}

.details-btn {
  background: transparent;
  color: #001f60;
  border: 2px solid #001f60;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.details-btn:hover {
  background: #001f60;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 31, 96, 0.3);
}

/* Services Section */
.services {
  padding: 80px 0;
  background: #f9fafb;
}

.services h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 31, 96, 0.15);
  border-color: #001f60;
}

.service-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #001f60, #31a7c9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1.5rem;
  transition: transform 0.3s ease;
}

.service-icon:hover {
  transform: scale(1.1);
}

.service-icon .el-icon {
  font-size: 28px;
}

.service-card h3 {
  color: #001f60;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

/* Cost Estimation */
.cost-estimation {
  padding: 80px 0;
}

.cost-estimation h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.cost-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.cost-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid #e5e7eb;
  transition: border-color 0.3s;
}

.cost-card:hover {
  border-color: #001f60;
}

.cost-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #001f60;
  margin-bottom: 1rem;
}

.cost-card ul {
  list-style: none;
  text-align: left;
  margin-top: 1rem;
}

.cost-card li {
  padding: 0.5rem 0;
  color: #6b7280;
}

.cost-card li:before {
  content: "✓";
  color: #31a7c9;
  margin-right: 0.5rem;
}

/* Testimonials */
.testimonials {
  padding: 80px 0;
  background: #f9fafb;
}

.testimonials h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 31, 96, 0.15);
  border-color: #001f60;
}

.testimonial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.client-avatar1,
.client-avatar2 {
  width: 60px;
  height: 60px;
  // background: linear-gradient(135deg, #001f60, #31a7c9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.client-avatar1 {
  background-image: url('../../assets/img/man.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.client-avatar2 {
  background-image: url('../../assets/img/girl.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.client-avatar .el-icon {
  font-size: 24px;
}

.rating {
  display: flex;
  gap: 2px;
}

.rating .el-icon {
  color: #ffd700;
  font-size: 18px;
}

.testimonial-card p {
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #374151;
  font-size: 1.1rem;
}

.author strong {
  color: #1f2937;
  font-size: 1.1rem;
}

.author span {
  color: #6b7280;
  display: block;
  margin-top: 0.25rem;
}

/* Trust Section */
.trust {
  padding: 80px 0;
}

.trust h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  .certificate-item {
    text-align: center;
  }

  .certificate-item:nth-child(1) {
    .certificate-image {
      background-image: url('../../assets/img/zs1.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  .certificate-item:nth-child(2) {
    .certificate-image {
      background-image: url('../../assets/img/zs2.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  .certificate-item:nth-child(3) {
    .certificate-image {
      background-image: url('../../assets/img/zs3.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  .certificate-item:nth-child(4) {
    .certificate-image {
      background-image: url('../../assets/img/zs4.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}


.certificate-image {
  width: 250px;
  height: 350px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, rgba(0, 31, 96, 0.1), rgba(255, 0, 0, 0.1));
  color: #001f60;
  font-weight: bold;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap: 1rem;
}

.certificate-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 31, 96, 0.2);
}

.certificate-image .el-icon {
  font-size: 48px;
  color: #31a7c9;
}

.certificate-image span {
  font-size: 14px;
  text-align: center;
}

.trust-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.trust-content h3 {
  color: #001f60;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.trust-content h4 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.tips-list {
  text-align: left;
  margin-top: 2rem;
}

.tip {
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, rgba(0, 31, 96, 0.05), rgba(255, 0, 0, 0.05));
  border-left: 4px solid #001f60;
  border-radius: 4px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tip:hover {
  transform: translateX(5px);
}

.tip .el-icon {
  color: #001f60;
  font-size: 18px;
  flex-shrink: 0;
}

/* CTA Section */
.cta {
  background: linear-gradient(135deg, #001f60 0%, #31a7c9 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  animation: floating 10s ease-in-out infinite;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.cta-button {
  background: white;
  color: #001f60;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  background: #f0f0f0;
}

/* Footer */
.footer {
  background: #1f2937;
  color: white;
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #f9fafb;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  padding: 0.25rem 0;
  color: #d1d5db;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 2rem;
  text-align: center;
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .fixed-right-panel {
    right: 10px;
    gap: 10px;
  }

  .fixed-action-btn {
    width: 50px;
    height: 50px;
  }

  .fixed-action-btn .el-icon {
    font-size: 20px;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-text {
    text-align: center;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .about-header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-image-placeholder {
    height: 200px;
  }

  .about-features {
    flex-direction: column;
    gap: 2rem;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
  }

  .feature-icon .el-icon {
    font-size: 24px;
  }

  .nav {
    display: none;
  }

  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }

  .social-icons {
    justify-content: center;
  }

  .products-grid,
  .services-grid,
  .cost-grid,
  .testimonials-grid,
  .certificates-grid {
    grid-template-columns: 1fr;
  }

  .product-actions {
    flex-direction: column;
  }

  .main-product-image {
    height: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .service-icon {
    width: 60px;
    height: 60px;
  }

  .service-icon .el-icon {
    font-size: 24px;
  }

  .testimonial-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .certificate-image {
    width: 120px;
    height: 160px;
  }

  .certificate-image .el-icon {
    font-size: 36px;
  }
}
</style>
