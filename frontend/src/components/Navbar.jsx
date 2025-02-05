import PropTypes from "prop-types";

const Navbar = ({ userId, handleLogout }) => {
  return (
    <div className="mx-auto px-4 h-16 flex items-center justify-between">
      <span className="font-semibold">{userId.toUpperCase()}</span>
      <button
        className="cursor-pointer min-w-fit rounded-lg hover:bg-slate-800/20 px-4 py-2 hover:ring ring-gray-800"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
