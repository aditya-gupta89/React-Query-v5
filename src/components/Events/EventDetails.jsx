import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  deleteEvent,
  fetchEvent,
  fetchSelectableImages,
} from "../../utils/http.js";

import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      "event",
      {
        id,
      },
    ],
    queryFn: () => fetchEvent({ id }),
  });
  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate("/events");
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
    },
  });

  console.log(id, data);
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <LoadingIndicator />}
      {isError && (
        <ErrorBlock
          title="Please try again later"
          message={
            error?.info?.message || "Data is not available try again later"
          }
        />
      )}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data?.title}</h1>
            <nav>
              <button onClick={() => mutate({ id })}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt="" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data?.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data?.time}</time>
              </div>
              <p id="event-details-description">{data?.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
