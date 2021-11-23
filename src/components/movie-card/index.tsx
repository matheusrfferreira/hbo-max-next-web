import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import React, {useState, useEffect, ComponentProps} from "react";

import styles from "./index.module.css";
import { Options } from "./types";


export const MovieCard = ({ imdbId }: ComponentProps<string>) => {

    const[movie, setMovie] = useState({});

    const options: Options= {
        method: 'GET',
        url: `https://data-imdb1.p.rapidapi.com/movie/id/${imdbId}/`,
        headers: {
            'x-rapidapi-key': 'c4d49d8defmshf022ec90a8b92e0p1ebd7cjsn6280a45128bc',
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
        },
    };

    useEffect(()=> {

        axios.request(options).then(function (response) {
            setMovie(response.data.results);
        }).catch(function (error) {
            console.error(error);
        });

    },[])

    return (
        <div className={styles.container}>
            {movie.image_url ? <Link href={`/movies/${movie.imdb_id}`}>
                <Image src={movie.banner}
                       alt={movie.title}
                       width={250}
                       height={330}
                       quality={100}
                       layout={"fixed"}
                       priority={true}
                       className={styles.container}
                />
            </Link> : <h2>〇</h2>}
        </div>
    );
};

