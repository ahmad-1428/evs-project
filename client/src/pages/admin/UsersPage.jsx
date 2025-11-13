import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Badge, Container } from "react-bootstrap";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { FaUserShield, FaRegUser } from "react-icons/fa";

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get(`/admin/users`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUsers(data);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to load users";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userInfo]);

  const renderStatusBadge = (isAdmin) =>
    isAdmin ? (
      <Badge bg="success" className="px-3 py-1 rounded-pill">
        <FaUserShield className="me-1" />
        Authorized User
      </Badge>
    ) : (
      <Badge bg="secondary" className="px-3 py-1 rounded-pill">
        <FaRegUser className="me-1" />
        Normal Customer
      </Badge>
    );

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;

  return (
    <Container fluid className="py-4">
      <h2 className="mb-3">Manage Users</h2>

      <div className="bg-white rounded shadow-sm p-3">
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead style={{ backgroundColor: "#f4f4f4" }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="text-center">{renderStatusBadge(user.isAdmin)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default UsersPage;
