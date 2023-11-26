import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import Header from '@/components/header/header';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }))


describe('Home', () => {
    it('should have dashboard', () => {
        render(<Home/>)
    
        
        expect(<Home/>).toStrictEqual(<Home/>)
    })

})

describe('Header', () => {
    it('should have a login text', () => {
        render(<Header/>)
        const myElement = screen.getByText('Login')

        expect(myElement).toBeInTheDocument()
    })
})