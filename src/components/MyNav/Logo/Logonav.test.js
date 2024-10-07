import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Logo from './Logo'; 

describe('Test Logo Component', () => {
    it('should render the logo image and the text EPIBOOKS', () => {
        
        render(<Logo />);

        
        const logoImage = screen.getByAltText('logo');
        expect(logoImage).toBeInTheDocument();

       
        const logoText = screen.getByText('EPIBOOKS');
        expect(logoText).toBeInTheDocument();
    });
});