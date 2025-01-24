"use client";

import { Provider } from "react-redux";
import "./globals.css";
import store from "@/store/store";
import { getProfile, getSuggestions } from "@/api/profile";
import { getCompetion, getDomain, getUniversity } from "@/api/option";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUserInfo } from "@/reducers/userInfoSlice";
import { setCompetition } from "@/reducers/competitionSlice";
import { setUniversity } from "@/reducers/universitySlice";
import { setDomain } from "@/reducers/domainSlice";
import { setFilterData, setSuggestion } from "@/reducers/suggestionSlice";
import Sidebar from "@/components/layout/Sidebar";
import { BeatLoader } from "react-spinners";


function AppContent({ children }) {
  const dispatch = useDispatch();
  const [openModalSetting, setOpenModalSetting] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstRenderFilter, setIsFirstRenderFilter] = useState(true);
  const [isSidebarLoading, setIsSidebarLoading] = useState(true);
  const [filter, setFilter] = useState({
    university__id: "",
    team_member_count: "",
    city: "",
    competition__id: "",
    domain__id: "",
    skill_set: "",
    age__gte: 18,
    age__lte: 25,
    competition__year: "",
  });
  const [isFirstSetting, setIsFirstSetting] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const isHaveSidebar = true;

  const toggleOpenModalSetting = () => {
    setIsChangePassword(false);
    setOpenModalSetting(!openModalSetting);
  };

  const fetchSuggestion = (data) => {
    setIsLoading(true);
    getSuggestions(data)
      .then((res) => {
        dispatch(setFilterData(data));
        dispatch(setSuggestion(res.data.results));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!isFirstRender) {
      const data = {
        page: 1,
        size: 10,
        university__id: filter.university__id,
        team_member_count: filter.team_member_count,
        city: filter.city,
        competition__id: filter.competition__id,
        domain__id: filter.domain__id,
        skill_set: Array.isArray(filter.skill_set)
          ? filter.skill_set.join(",")
          : "",
        age__gte: filter.age__gte,
        age__lte: filter.age__lte,
        competition__year: filter.competition__year,
        gender: filter.gender,
      };

      for (const key in data) {
        if (data[key] === "" || data[key] === null) {
          delete data[key];
        }
      }

      fetchSuggestion(data);
    }
  }, [filter]);

  const search = (value) => {
    const data = {
      search: value,
      page: 1,
      size: 10,
    };

    fetchSuggestion(data);
  };

  const fetchProfile = () => {
    setIsSidebarLoading(true);
    getProfile()
      .then((res) => {
        if (!res.is_update_setting) {
          setIsFirstSetting(true);
          setOpenModalSetting(true);
        }
        dispatch(setUserInfo(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCompetion = () => {
    getCompetion()
      .then((res) => {
        dispatch(setCompetition(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUniversity = () => {
    getUniversity()
      .then((res) => {
        dispatch(setUniversity(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDomain = () => {
    getDomain()
      .then((res) => {
        dispatch(setDomain(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    const fetchData = async () => {
      if (isHaveSidebar && isFirstRenderFilter) {
        await Promise.all([fetchCompetion(), fetchUniversity(), fetchDomain()]);
        if (isFirstRender) {
          fetchProfile();
          setIsFirstRender(false);
          setIsSidebarLoading(false);
        }
        setIsFirstRenderFilter(false);
      }
    };

    fetchData();
  }, [isHaveSidebar]);

  return (
    <>
      <div className="wrapper">
        {isHaveSidebar && (
          <Sidebar
            toggleOpenModalSetting={toggleOpenModalSetting}
            isSidebarLoading={isSidebarLoading}
            search={search}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        {isLoading ? (
          <div className="w-screen h-[100vh] bg-black flex items-center justify-center">
            <BeatLoader color="#fff" size={10} />
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>hustly.space</title>
        <link rel="icon" href="/logo-icon.svg" type="image/svg" />
        <meta name="description" content="hustly.space" />
        <meta property="og:title" content="hustly.space" />
        <meta property="og:description" content="hustly.space" />
        <meta property="og:image" content="/logo-icon.svg" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Provider store={store}>
            <AppContent>{children}</AppContent>
        </Provider>
      </body>
    </html>
  );
}
