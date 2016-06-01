<script language="vb" runat="server">
	Sub Page_Load(sender as Object, e as EventArgs)
		Response.Write ("Value:" & txtSomething.Text)
	End Sub
</script>

<html>
<body>
	<form runat="server"> Enter:
		<asp:textbox runat="server" id="txtSomething"/>
		<asp:button runat="server" Text="Submit"/>
	</form>
</body>
</html>
