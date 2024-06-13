import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";

const RelatorioList = () => {
  const apiService = new APIService();

  const [data, setData] = useState({
    categoryCount: 0,
    genderCount: 0,
    directorsCount: 0,
    actorsCount: 0,
    worksCount: 0,
    mostCategories: [],
    mostGenders: [],
    mostDirectors: [],
    lastWorks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          categoriesResponse,
          gendersResponse,
          directorsResponse,
          actorsResponse,
          worksResponse
        ] = await Promise.all([
          apiService.getData(ApiRoutes.category),
          apiService.getData(ApiRoutes.gender),
          apiService.getData(ApiRoutes.director),
          apiService.getData(ApiRoutes.actor),
          apiService.getData(ApiRoutes.works),
        ]);

        const categories = categoriesResponse || [];
        const genders = gendersResponse || [];
        const directors = directorsResponse || [];
        const actors = actorsResponse || [];
        const works = worksResponse || [];

        console.log("Categories:", categories);
        console.log("Genders:", genders);
        console.log("Directors:", directors);
        console.log("Actors:", actors);
        console.log("Works:", works);

        const categoryWorksList = getCategoryWorksList(categories, works);
        const genderWorksList = getGenderWorksList(genders, works);
        const directorWorksList = getDirectorWorksList(directors, works);

        console.log("Category Works List:", categoryWorksList);
        console.log("Gender Works List:", genderWorksList);
        console.log("Director Works List:", directorWorksList);

        setData({
          categoryCount: categories.length,
          genderCount: genders.length,
          directorsCount: directors.length,
          actorsCount: actors.length,
          worksCount: works.length,
          mostCategories: categoryWorksList.sort((a, b) => b.worksList.length - a.worksList.length).slice(0, 5),
          mostGenders: genderWorksList.sort((a, b) => b.worksList.length - a.worksList.length).slice(0, 5),
          mostDirectors: directorWorksList.sort((a, b) => b.worksList.length - a.worksList.length).slice(0, 5),
          lastWorks: works.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
        });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Relatórios</h1>
      <div>
        <h2>Estatísticas</h2>
        <p>Quantidade de Categorias: {data.categoryCount}</p>
        <p>Quantidade de Gêneros: {data.genderCount}</p>
        <p>Quantidade de Diretores: {data.directorsCount}</p>
        <p>Quantidade de Atores: {data.actorsCount}</p>
        <p>Quantidade de Obras: {data.worksCount}</p>
      </div>
      <div>
        <h2>Categorias com mais obras</h2>
        <ul>
          {data.mostCategories.map(({ category, worksList }) => (
            <li key={category.id}>{category.name} - {worksList.length} obras</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Gêneros com mais obras</h2>
        <ul>
          {data.mostGenders.map(({ gender, worksList }) => (
            <li key={gender.id}>{gender.name} - {worksList.length} obras</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Diretores com mais obras</h2>
        <ul>
          {data.mostDirectors.map(({ director, worksList }) => (
            <li key={director.id}>{director.name} - {worksList.length} obras</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Últimas obras cadastradas</h2>
        <ul>
          {data.lastWorks.map(work => (
            <li key={work.id}>{work.title} - {new Date(work.createdAt).toLocaleDateString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Funções separadas para processar os dados
const getCategoryWorksList = (categories, works) => {
  return categories.map(category => {
    const worksList = works.filter(work => work.categoryId === category.id);
    return { category, worksList };
  });
};

const getGenderWorksList = (genders, works) => {
  return genders.map(gender => {
    const worksList = works.filter(work => work.genderId === gender.id);
    return { gender, worksList };
  });
};

const getDirectorWorksList = (directors, works) => {
  return directors.map(director => {
    const worksList = works.filter(work => work.directorId === director.id);
    return { director, worksList };
  });
};

export default RelatorioList;
