SELECT
  *
FROM
  (
    SELECT
      users.id,
      users.name,
      users.email,
      users.login,
      sum(total) as compras
    FROM
      `order`
      INNER JOIN users ON users.id = `order`.user_id
    WHERE
      `order`.created_at > "2025-02-14T00:00:00"
      and status = "DONE"
    GROUP BY
      users.id
  ) a
WHERE
  a.compras > 999
ORDER BY
  name;
  
SELECT
  *
FROM
  (
    SELECT
      a1.id,
      a1.name,
      a1.login,
      a1.email,
      sum(`order`.total) total
    FROM
      users as a1
      INNER JOIN users as a2 ON a2.ancestry like concat("%#", a1.id, "#%")
      INNER JOIN `order` ON `order`.user_id = a2.id
      AND `order`.status = "DONE"
      AND `order`.created_at >= "2025-02-14T05:00:00"
    group by
      a1.id
    ORDER BY
      a1.id
  ) as a
WHERE
  a.total > 20000;
SELECT
  *
FROM
  (
    SELECT
      a1.id,
      a1.name,
      a1.login,
      a1.email,
      sum(`order`.total) total
    FROM
      users as a1
      INNER JOIN users as a2 ON a2.sponsor_id = a1.id
      INNER JOIN `order` ON `order`.user_id = a2.id
      AND `order`.status = "DONE"
      AND `order`.created_at >= "2025-02-14T05:00:00"
    group by
      a1.id
    ORDER BY
      a1.id
  ) as a
WHERE
  a.total > 5000;