import { useEffect, useReducer } from "react";
import { Card } from "../../components/Card/Card";
import { SimpleGrid } from "@mantine/core";
import { Modal } from "../../components/Modal/Modal";
import { type Action, type State, type Launch } from "../../types/types";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setLaunches":
      return { ...state, launches: action.payload };
    case "setIsModalOpen":
      return { ...state, isModalOpen: action.payload };
    case "setSelectedLaunch":
      return { ...state, selectedLaunch: action.payload };
    default:
      return state;
  }
};

export const CardsList = () => {
  const [data, dispatch] = useReducer(reducer, {
    launches: [],
    isModalOpen: false,
    selectedLaunch: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchLaunches = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/launches", {
          signal,
        });

        if (!response.ok) throw new Error("");

        const data = await response.json();
        dispatch({ type: "setLaunches", payload: data });
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchLaunches();

    return () => abortController.abort("отмена повторного запроса");
  }, []);

  const onCloseModal = () => {
    dispatch({ type: "setIsModalOpen", payload: false });
  };

  const handleClick = (launch: Launch) => {
    dispatch({ type: "setSelectedLaunch", payload: launch });
    dispatch({ type: "setIsModalOpen", payload: true });
  };

  return (
    <>
      <SimpleGrid cols={4} verticalSpacing="sm">
        {data.launches.map((launch) => (
          <Card
            key={launch.launch_date_unix}
            src={launch.links?.mission_patch_small ?? null}
            title={launch.mission_name}
            text={launch.rocket?.rocket_name ?? null}
            alt={launch.mission_name}
            moreInfo={() => handleClick(launch)}
          />
        ))}
      </SimpleGrid>
      {data.isModalOpen && data.selectedLaunch && (
        <Modal onClose={onCloseModal}>
          <h3>{data.selectedLaunch.mission_name}</h3>
          <img
            style={{
              maxHeight: "250px",
            }}
            src={data.selectedLaunch.links?.mission_patch}
          />
          <h4>Mission name:</h4>
          <p>{data.selectedLaunch.mission_name}</p>
          <h4>Rocket name:</h4>
          <p>{data.selectedLaunch.rocket?.rocket_name}</p>
          <h4>Details</h4>
          <p>{data.selectedLaunch.details}</p>
        </Modal>
      )}
    </>
  );
};
