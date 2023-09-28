import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

test('renders top 5 rented movies', async () => {
    const { getByText } = render(<Home/>)
    await waitFor(() => {
        expect(getByText("BUCKET BROTHERHOOD")).toBeInTheDocument();
        expect(getByText("ROCKETEER MOTHER")).toBeInTheDocument();
        expect(getByText("SCALAWAG DUCK")).toBeInTheDocument();
        expect(getByText("JUGGLER HARDLY")).toBeInTheDocument();
        expect(getByText("GRIT CLOCKWORK")).toBeInTheDocument();
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
