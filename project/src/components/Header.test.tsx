import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { FilterOption, SortOption } from '../types';

describe('Header component', () => {
  const mockProps = {
    searchTerm: '',
    onSearchChange: jest.fn(),
    filterOption: 'all' as FilterOption,
    onFilterChange: jest.fn(),
    sortOption: 'dueDate' as SortOption,
    onSortChange: jest.fn(),
    darkMode: false,
    toggleDarkMode: jest.fn(),
    mobileMenuOpen: false,
    toggleMobileMenu: jest.fn(),
  };

  test('renders the header text', () => {
    render(<Header {...mockProps} />);
    const headerElement = screen.getByText(/TaskFlow/i);
    expect(headerElement).toBeInTheDocument();
  });
});
