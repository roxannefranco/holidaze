function Layout(props) {
  return (
    <div>
      <main className="with-header">{props.children}</main>
    </div>
  );
}

export default Layout;
