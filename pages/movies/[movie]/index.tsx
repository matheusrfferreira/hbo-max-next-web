import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./index.module.css";
import { Navbar } from "../../../src/components/navbar";


function MovieData(): NextPage {

    const router = useRouter();
    const { movie } = router.query;

    const[selectedMovie, setSelectedMovie] = useState({})

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




    return (
        <div className={styles.container }>
            <Head>

                { selectedMovie.title ? (<title>{selectedMovie.title}</title>) : (<title>Movie</title>)}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Navbar />

            <div >
                { selectedMovie.title && (
                    <div className={styles.movie}>
                        <div>
                            <a href={selectedMovie.trailer}><Image
                                src={selectedMovie.banner}
                                alt={selectedMovie.title}
                                quality={100}
                                width={400}
                                height={500}
                                className={styles.image}
                            /></a>

                        </div>

                        <div className={styles.movieData}>
                                <h1>{selectedMovie.title} </h1>
                            <div className={styles.releaseAndMovieLength}>
                                <p>Release: {selectedMovie.release}</p>
                                <p>Movie Length: {selectedMovie.movie_length} minutes</p>
                            </div>
                            <p>Content Rating: {selectedMovie.content_rating}</p>
                            <p>Description: {selectedMovie.description}</p>
                        </div>
                    </div>
                    )}
            </div>
        </div>

    );
};

export default MovieData;

