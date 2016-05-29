<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> test xml </title>
<head>
<script>
//alert ("Hello!");
//-----------------------------------------------------------
// слои
//-----------------------------------------------------------

  function processnode(nnodeid)
   {

//alert (document.getElementById("div_" + nnodeid));

    if (document.getElementById("div_" + nnodeid).style.display == "none")
      {
      document.getElementById("div_" + nnodeid).style.display = ""
      }
    else
      {
      document.getElementById("div_" + nnodeid).style.display = "none"
      }
   }

</script>
</head>
<body>

<h1> my notes   </h1>

	<xsl:apply-templates/> 

<table border="1">
    <tr>
      <th align="left">section</th>
      <th align="left">text_note</th>
    </tr>
    <xsl:for-each select="notes/section/note">
    <tr>
      <td><pre><xsl:value-of select="@title" /></pre></td>
      <td><pre><xsl:value-of select="text_note" /></pre></td>
    </tr>
    </xsl:for-each>
</table>


</body>
</html>
</xsl:template>

<xsl:template match="note">
<table border="1" align="center" bgcolor="#CECDD6" width="96%" cellpadding="10" cellspacing="1">
<tr>
<td align="justify">
<pre><xsl:apply-templates select="text_note"/></pre>
</td>
 </tr>
</table>
</xsl:template>

</xsl:stylesheet>
