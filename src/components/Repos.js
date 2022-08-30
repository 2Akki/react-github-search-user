import React from "react";
import styled from "styled-components";
import { GetGithubContext, GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = GetGithubContext();
  //Creating the Reducers
  
  let languages = repos.reduce((ttl, item) => {
    const { language, stargazers_count } = item;
    if (!language) return ttl;
    if (!ttl[language]) {
      ttl[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      ttl[language] = {
        ...ttl[language],
        value: ttl[language].value + 1,
        stars: ttl[language].stars + stargazers_count,
      };
    }

    return ttl;
  }, {});

  let { stars, forks } = repos.reduce(
    (ttl, item) => {
      const { stargazers_count, name, forks } = item;
      ttl.stars[stargazers_count] = { label: name, value: stargazers_count };
      
      ttl.forks[stargazers_count] = { label: name, value: forks };
      return ttl;
    },
    { stars: {}, forks: {} }
  );
///  
///Ending it here 
///
//////////////////////////////////////////////////////////////////////////

 //Creating Object values 
 const MostPopuler = Object.values(stars)
 .sort((st, obj) => {
   return obj.value - st.value;
 })
 .slice(0, 5);


const MostForked = Object.values(forks).sort((st,obj)=>{
 return obj.value-st.value
}).slice(0,5)  

const mostUsed = Object.values(languages)
 .sort((st, obj) => {
   return obj.value - st.value;
 })
 .slice(0, 5);

const mostStars = Object.values(languages).sort((st, obj) => {
 return obj.stars - st.stars;
});

///
/// Ending it here
///




  let sortedArrayOfMostStars = [
    ...mostStars
      .map((stars) => {
        return { value: stars.stars, label: stars.label, stars: stars.value };
      })
      .slice(0, 5),
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={MostPopuler}></Column3D>
        <Doughnut2D data={sortedArrayOfMostStars}></Doughnut2D>
        <Bar3D data={MostForked}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
