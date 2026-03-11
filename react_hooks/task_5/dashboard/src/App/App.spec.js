import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

// On mock axios
jest.mock("axios");

const mockNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: { __html: "Here is the list of notifications" } },
];

const mockCourses = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];

describe("App component with dynamic data fetching", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  test("fetches and displays notifications when App loads", async () => {
    axios.get.mockResolvedValueOnce({ data: mockNotifications });

    render(<App />);

    // Drawer fermé initialement
    const notifTitle = screen.getByText("Your notifications");
    fireEvent.click(notifTitle); // ouvre drawer

    // On attend que la notification spéciale apparaisse
    await waitFor(() => {
      expect(screen.getByText("Here is the list of notifications")).toBeInTheDocument();
    });
  });

  test("fetches courses when user logs in", async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockNotifications }) // notifications fetch
      .mockResolvedValueOnce({ data: mockCourses });      // courses fetch

    render(<App />);

    // Remplir login
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@test.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("OK")); // Submit login

    // Vérifie que le cours "ES6" apparait
    await waitFor(() => {
      expect(screen.getByText("ES6")).toBeInTheDocument();
      expect(screen.getByText("Webpack")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  test("handleDisplayDrawer and handleHideDrawer work", async () => {
    axios.get.mockResolvedValueOnce({ data: mockNotifications });

    render(<App />);

    const notifTitle = screen.getByText("Your notifications");
    fireEvent.click(notifTitle); // ouvre drawer

    await waitFor(() => {
      expect(screen.getByText("Here is the list of notifications")).toBeInTheDocument();
    });

    // Fermer le drawer
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    });
  });
});