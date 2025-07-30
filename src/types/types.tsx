export type Launch = {
  mission_name: string;
  links?: {
    mission_patch_small: string;
    mission_patch: string;
  };
  rocket?: {
    rocket_name: string;
  };
  details?: string;
  launch_date_unix: number;
};

export type State = {
  launches: Launch[];
  isModalOpen: boolean;
  selectedLaunch: Launch | null;
};

export type Action =
  | { type: "setLaunches"; payload: Launch[] }
  | { type: "setIsModalOpen"; payload: boolean }
  | { type: "setSelectedLaunch"; payload: Launch | null };

export type CardProps = {
  src: string | null;
  title: string;
  text: string | null;
  alt: string;
  moreInfo: () => void;
};

export type OverlayProps = {
  onClose: () => void;
};
