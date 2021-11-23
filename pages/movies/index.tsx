import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import styles from "./movies.module.css";
import { MovieCard } from "../../src/components/movie-card";
import { Navbar } from "../../src/components/navbar";


function Movies({ movies }): NextPage {
    return (
        <div className={styles.container}>
            <Head>
                <title>Horror Max</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Navbar />

            <div className={styles.movies}>
                {movies.map((movie) => (
                <MovieCard key={movie.imdb_id} imdbId={movie.imdb_id} />
                ))}
            </div>
        </div>

    );
};


export async function getStaticProps() {

    const options: any = {
        method: 'GET',
        url: 'https://data-imdb1.p.rapidapi.com/movie/byGen/Horror/',
        params: {page_size: '150'},
        headers: {
            'x-rapidapi-key': 'c4d49d8defmshf022ec90a8b92e0p1ebd7cjsn6280a45128bc',
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
        },
    };

    const response = await axios.request(options);

    const movies = await response.data.results;

    return {
        props: {
            movies,
        },
    };
};

export default Movies;