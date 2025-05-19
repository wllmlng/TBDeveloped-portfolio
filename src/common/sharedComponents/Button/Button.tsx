import { useState } from 'react';
import styles from './Button.module.scss';
import useOnClickOut from '../../hooks/useOnClickOut';

interface Props {
    label: string;
    options: { value: string; label: string }[];
    disabled: boolean;
    includeSearch?: boolean;
    change: (value: string) => void;
    selected: string;
}
const Button = ({ label, options, disabled, includeSearch=false, change, selected }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOptionSelect = (value: string) => {
        setIsDropdownOpen(false); 
        setSearchTerm(''); 
        change(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); 
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ref = useOnClickOut({ onClickOut: () => setIsDropdownOpen(false) });

    return (
        <div ref={ref} className={styles.dropdownContainer}>
            <button 
                disabled={disabled}
                className={`${styles.button} ${isDropdownOpen ? styles.toggled : ''} font-light`} 
                onClick={handleToggleDropdown}
            >
                {label}
            </button>
            {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                    {includeSearch &&
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles.searchInput} 
                        />
                    }
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option: { value: string; label: string }, index: number) => (
                            <div 
                                key={index} 
                                className={styles.dropdownItem} 
                                onClick={() => handleOptionSelect(option.value)} 
                                style={{backgroundColor: option.value === selected ? 'grey' : 'transparent'}}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResults}>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Button;