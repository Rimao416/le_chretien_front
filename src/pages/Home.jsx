import React, { useEffect } from "react";
import ContainerLayout from "../layout/ContainerLayout";
import Header from "../components/Header";
import Title from "../components/Title";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useCallback } from "react";

// Import Swiper styles
import "swiper/css";
import Alchimiste from "../assets/img/livre_8.jpeg";
import Fascination from "../assets/img/livre_7.jpeg";
import DaVinci from "../assets/img/livre_6.jpeg";
import Secret from "../assets/img/livre_5.jpg";
import Miracle from "../assets/img/livre_4.jpg";
import BookLayout from "../layout/BookLayout";
import MainBook from "../components/MainBook";
import { fetchBooks } from "../redux/slice/bookSlice";
import { Pagination } from "swiper/modules";
import useBookSearch from "../hooks/useBookSearch";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const { books, loading } = useSelector((state) => state.bookReducer);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Charger plus de livres ici, si nécessaire
          // Par exemple, ajoutez plus d'éléments à books ou mettez à jour books à partir de votre source de données
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  function getRandomBooks(allBooks, numberOfBooks) {
    // Vérifiez si le nombre demandé est supérieur au nombre total de livres
    if (numberOfBooks >= allBooks.length) {
      // Si oui, retournez la liste complète de livres
      return allBooks;
    }

    // Utilisez un tableau temporaire pour stocker les indices des livres sélectionnés
    const selectedIndices = [];

    // Remplissez le tableau `selectedIndices` avec des indices aléatoires uniques
    while (selectedIndices.length < numberOfBooks) {
      const randomIndex = Math.floor(Math.random() * allBooks.length);

      // Vérifiez si l'indice n'a pas déjà été sélectionné
      if (!selectedIndices.includes(randomIndex)) {
        selectedIndices.push(randomIndex);
      }
    }

    // Utilisez les indices sélectionnés pour obtenir les livres correspondants
    const selectedBooks = selectedIndices.map((index) => allBooks[index]);

    return selectedBooks;
  }
  function getBooksByCategory(allBooks, category) {
    // Utilisez la méthode `filter` pour obtenir les livres de la catégorie spécifiée
    const booksInCategory = allBooks.filter((book) =>
      book.categories.includes(category)
    );

    return booksInCategory;
  }

  const sortedBooks = books.slice().sort((a, b) => b.rating - a.rating);
  const recommendedBooks = getRandomBooks(books, 10);
  const booksInReligionCategory = getBooksByCategory(books, "Religion");
  // console.log(recommendedBooks);
  // console.log(sortedBooks);
  return (
    <ContainerLayout>
      <div className="home">
        <Header />
        <BookLayout withTitle={true} titre="Les mieux évalués" className="mt-3">
          <div className="mostread">
            <Swiper
              slidesPerView={6}
              spaceBetween={30}
              autoplay={true}
              loop={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {sortedBooks.map((books) => (
                <SwiperSlide>
                  <MainBook {...books} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </BookLayout>

        <BookLayout withTitle={true} titre="Nous vous recommandons">
          <div className="recommend__container">
            <Swiper
              slidesPerView={6}
              spaceBetween={30}
              autoplay={true}
              loop={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {recommendedBooks.map((books) => (
                <SwiperSlide>
                  <div className="recommend__container--flex">
                    <img
                      src={Fascination}
                      className="recommend__container--img"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </BookLayout>
        <BookLayout withTitle={true} titre="Religion">
          <div className="mostread">
            <Swiper
              slidesPerView={6}
              autoplay={true}
              loop={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {booksInReligionCategory.map((books) => (
                <SwiperSlide>
                  <MainBook {...books} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </BookLayout>
        <BookLayout withTitle={true} titre="Religion">
          <div className="mostread">
            <MainBook image={Alchimiste} title="Cendrillon" lectures="25k" />
            <MainBook image={Alchimiste} title="Lolita" lectures="25k" />
            <MainBook image={Alchimiste} title="Matilda" lectures="25k" />
            <MainBook
              image={Alchimiste}
              title="L'Amour au Temps du Choléra"
              lectures="25k"
            />
            <MainBook
              image={Alchimiste}
              title="Le Seigneur des Anneaux : La Communauté de l'Anneau"
              lectures="25k"
            />
            <MainBook
              image={Alchimiste}
              title="La Ville des Menteurs : Comment Washington est devenu le principal distributeur de fausses nouvelles du monde"
              lectures="25k"
            />
          </div>
        </BookLayout>

        <BookLayout withTitle={true} titre="Ajoutés reçemment">
          <div className="mostread gap">
            {books.map((book, index) => (
              <div
                key={index}
                ref={index === books.length - 1 ? lastBookElementRef : null}
              >
                <MainBook
                  image={Alchimiste}
                  title="Cendrillon"
                  lectures="25k"
                />
              </div>
            ))}
            {loading && <div>Loading...</div>}
           
          </div>
        </BookLayout>
      </div>
    </ContainerLayout>
  );
}

export default Home;
