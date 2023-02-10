import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function TextButton({ children, sx, size, disabled, color, variant, ...rest }) {
  return (
    <Button
      size={size}
      sx={{
        ...sx,
        textDecoration: 'none',
        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
        textTransform: 'none',
      }}
      {...rest}
      color={color}
      variant={variant}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default TextButton;

TextButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

TextButton.defaultProps = {
  size: 'medium',
  color: 'primary',
  variant: 'text',
  sx: {},
};
