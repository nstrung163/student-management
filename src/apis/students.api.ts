import http from "pages/utils/http";
import { Students } from "types/student.type";

export function getStudents(page: number | string, limit: number | string) {
  return http.get<Students[]>("students", {
    params: {
      _page: page,
      _limit: limit,
    },
  });
}
