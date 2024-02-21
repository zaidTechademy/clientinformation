import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ClientDashboard.css"; // Import custom CSS file for styling

const ClientDashboard = () => {
  const [clientData, setClientData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const ClientEdit = (id) => {
    navigate(`/client/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [searchInput]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3004/clients");
      setClientData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const Remove = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/clients/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error removing client:", error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };
  
  const filteredClient = clientData.filter((data) => data.companyname.toLowerCase().includes(searchInput.toLowerCase()) || data.phone.includes(searchInput.toLowerCase()) || data.email.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div className="container">
      <div className="card-title">
        <h2>Company Listed</h2>
      </div>
      <div className="card-body">
        <div className="divbtn">
          <Link to={"/client/create"} className="btn btn-success">
            Register New (+)
          </Link>
        </div>
        <div className="search-box">
          <input
            id="search-input"
            type="text"
            placeholder="Type to search..."
            value={searchInput}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredClient.map((item) => (
              <tr key={item.id}>
                <td>{item.companyname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    onClick={() => ClientEdit(item.id)}
                    className="btn btn-success"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => Remove(item.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDashboard;
