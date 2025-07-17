import Footer from "../Components/Footer/FooterSection";
import HeroSection from "../Components/Home/Hero";
import MainLayout from "../Layout/MainLayout/MainLayout";


 const Home = () => {
  return (
    <div>
    <MainLayout>
      <HeroSection />
    </MainLayout>
    <Footer />
   
    </div>

  );
}

export default Home;