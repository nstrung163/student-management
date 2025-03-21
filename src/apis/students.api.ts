import http from "pages/utils/http";
import { Student, Students } from "types/student.type";

export function getStudents(page: number | string, limit: number | string) {
  return http.get<Students[]>("students", {
    params: {
      _page: page,
      _limit: limit,
    },
  });
}

export const getStudent = (id: number | string) => {
  return http.get<Student>(`/students/${id}`);
};

export const addStudent = (student: Omit<Student, "id">) => {
  return http.post<Student>("/students", student);
};

export const updateStudent = (id: string | number, student: Student) => {
  return http.put<Student>(`/students/${id}`, student);
};

export const deleteStudent = (id: number | string) => {
  return http.delete<{}>(`students/${id}`);
};
