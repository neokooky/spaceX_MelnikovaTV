import { render, screen, waitFor } from "@testing-library/react";
import {
  expect,
  it,
  describe,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
} from "vitest";
import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";
import { CardsList } from "./CardsList";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

globalThis.fetch = vi.fn();

const mockLaunches = [
  {
    mission_name: "Launch 1",
    links: {
      mission_patch_small: "patch1.jpg",
      mission_patch: "patch1_large.jpg",
    },
    rocket: {
      rocket_name: "Falcon 9",
    },
    details: "Test details",
  },
];

describe("App component", function () {
  beforeEach(async () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockLaunches,
    });

    render(
      <MantineProvider>
        <CardsList />
      </MantineProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("отображается список карточек", async () => {
    await waitFor(() => {
      expect(screen.getByText("Launch 1")).toBeInTheDocument();
    });
  });

  it("открывается модальное окно при клике на кнопку", async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText("Launch 1")).toBeInTheDocument();
    });

    const seeMoreButton = screen.getByRole("button", { name: /see more/i });
    await user.click(seeMoreButton);

    await waitFor(() => {
      expect(screen.getByText("Mission name:")).toBeInTheDocument();
    });

    expect(screen.getByText("Rocket name:")).toBeInTheDocument();
  });

  it("закрывается модальное окно при клике на кнопку", async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText("Launch 1")).toBeInTheDocument();
    });

    const seeMoreButton = screen.getByRole("button", { name: /see more/i });
    await user.click(seeMoreButton);

    await waitFor(() => {
      expect(screen.getByText("Mission name:")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /close modal/i }));

    expect(screen.queryByText("Mission name:")).not.toBeInTheDocument();
  });

  it("выполняется fetch при монтировании", async () => {
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.spacexdata.com/v3/launches",
        expect.any(Object)
      );
    });
  });
});
