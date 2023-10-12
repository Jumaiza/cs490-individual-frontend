import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

test('renders top 5 rented movies', async () => {
    const { getByText } = render(<Home/>)
    await waitFor(() => {
        expect(getByText("BUCKET BROTHERHOOD")).toBeInTheDocument();
        expect(getByText("RIDGEMONT SUBMARINE")).toBeInTheDocument();
        expect(getByText("ROCKETEER MOTHER")).toBeInTheDocument();
        expect(getByText("JUGGLER HARDLY")).toBeInTheDocument();
        expect(getByText("SCALAWAG DUCK")).toBeInTheDocument();
    });
});

test('renders top 5 actors', async () => {
    const { getByText } = render(<Home/>)
    await waitFor(() => {
        expect(getByText("GINA DEGENERES")).toBeInTheDocument();
        expect(getByText("WALTER TORN")).toBeInTheDocument();
        expect(getByText("MARY KEITEL")).toBeInTheDocument();
        expect(getByText("MATTHEW CARREY")).toBeInTheDocument();
        expect(getByText("SANDRA KILMER")).toBeInTheDocument();
    });
});

test('renders movie details after click', async () => {
    const { getByText } = render(<Home/>)
    
    await waitFor(() => {
        fireEvent.click(getByText("BUCKET BROTHERHOOD"))
        expect(getByText("Movie Details:")).toBeInTheDocument()
        expect(getByText("film_id: 103")).toBeInTheDocument()
        expect(getByText("rental_rate: 4.99")).toBeInTheDocument()
    })
});

test('renders actor details after click', async () => {
    const { getByText } = render(<Home/>)
    
    await waitFor(() => {
        fireEvent.click(getByText("GINA DEGENERES"))
        expect(getByText("Actor Details:")).toBeInTheDocument()
        expect(getByText("actor_id: 107")).toBeInTheDocument()
        expect(getByText("first_name: GINA")).toBeInTheDocument()
        expect(getByText("last_name: DEGENERES")).toBeInTheDocument()
    })
});

test('renders actor top 5 rented movies after click', async () => {
    const { getByText } = render(<Home/>)
    
    await waitFor(() => {
        fireEvent.click(getByText("GINA DEGENERES"))
        expect(getByText("Top 5 Rented Movies of this Actor:")).toBeInTheDocument()
        expect(getByText("GOODFELLAS SALUTE: 31")).toBeInTheDocument()
        expect(getByText("WIFE TURN: 31")).toBeInTheDocument()
        expect(getByText("DOGMA FAMILY: 30")).toBeInTheDocument()
        expect(getByText("DEER VIRGINIAN: 29")).toBeInTheDocument()
        expect(getByText("STORM HAPPINESS: 29")).toBeInTheDocument()
    })
});
