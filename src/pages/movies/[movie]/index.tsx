import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./index.module.css";
import { Navbar } from "../../../components/navbar";
import { Movie } from "./types";


function MovieData() {

    const router = useRouter();
    const { movie } = router.query; 

    const[selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);

        useEffect(()=> {
            const options: any = {
                method: 'GET',
                url: `https://data-imdb1.p.rapidapi.com/movie/id/${movie}/`,
                params: {page_size: '150'},
                headers: {
                    'x-rapidapi-key': 'c4d49d8defmshf022ec90a8b92e0p1ebd7cjsn6280a45128bc',
                    'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                setSelectedMovie(response.data.results)
            }).catch(function (error) {
                console.error(error);
            });
        },[movie])

    const movieData: Movie = {
        title: selectedMovie?.title,
        trailer: selectedMovie?.trailer,
        banner: selectedMovie?.banner,
        release: selectedMovie?.release,
        description: selectedMovie?.description,
        content_rating: selectedMovie?.content_rating,
        movie_length: selectedMovie?.movie_length,
    }

    return (
        <div className={styles.container }>
            <Head>

                { movieData.title ? (<title>{movieData.title}</title>) : (<title>Movie</title>)}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Navbar />

            <div >
                { movieData && (
                    <div className={styles.movie}>
                        <div>
                            <a href={movieData.trailer}><Image
                                src={movieData.banner ? movieData.banner : 'movieData.banner'}
                                alt={movieData.title}
                                quality={100}
                                width={400}
                                height={500}
                                className={styles.image}
                            /></a>
                        </div>
                        <div className={styles.movieData}>
                                <h1>{movieData.title} </h1>
                            <div className={styles.releaseAndMovieLength}>
                                <p>Release: {movieData.release}</p>
                                <p>Movie Length: {movieData.movie_length} minutes</p>
                            </div>
                            <p>Content Rating: {movieData.content_rating}</p>
                            <p>Description: {movieData.description}</p>
                        </div>
                    </div>
                    )}
            </div>
        </div>

    );
};

export default MovieData;

